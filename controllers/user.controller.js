import User from "../mongodb/models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import OTP from "../mongodb/models/OTP.js";
import { sendSms } from "./mailer.js";

/** middleware for verify user */
export async function verifyUser(req, res, next) {
  try {
    const { email } = req.method == "GET" ? req.query : req.body;

    // check the user existance
    let exist = await User.findOne({ email });
    if (!exist) return res.status(404).send({ error: "Can't find User!!!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: `Authentication Error, ${error}` });
  }
}

/** POST: http://localhost:5001/api/register 
 * @param : {
  "name" : "example123",-
  "password" : "admin123",
  "email": "example@gmail.com",
  "msisdn": "8009860560",
  "id_number": "27912442",
  "kra_brs_number": "AB17567153",
  "role": "governor",
  "user_type": "resident"
}
*/

// Signup controller
export const signup = async (req, res) => {
  console.log("inside signup")
  try {
    const {
      name,
      email,
      password,
      msisdn,
    } = req.body;

    // check for existing email
    const existEmail = new Promise((resolve, reject) => {
      User.findOne({ email }, function (err, email) {
        if (err) reject(new Error(err));
        if (email) reject({ error: "Please use unique Email" });

        resolve();
      });
    });

    Promise.all([existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new User({
                name,
                password: hashedPassword,
                msisdn,
                email,
              });

              // return save result as a response
              user
                .save()
                .then((result) =>
                  res
                    .status(201)
                    .send({ msg: "User Register Successfully", result })
                )
                .catch((error) => res.status(500).send({ error }));
            })
            .catch((error) => {
              return res.status(500).send({
                error: `Unable to hash password, ${error}`,
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong, ${error}` });
  }
};

/** POST: http://localhost:5001/api/login 
 * @param: {
  "email" : "example123@host.com",
  "password" : "admin123"
}
*/

// Login controller
// Login controller
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(400).send({ error: "Invalid email or password" });
        }

        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return res.status(400).send({ error: "Invalid email or password" });
            }

            const { name, email, msisdn } = user;

            // create jwt token
            const token = jwt.sign(
              {
                name,
                email,
                msisdn,
              },
              process.env.JWT_SECRET,
              { expiresIn: "24h" }
            );

            return res.status(200).send({
              msg: "Login Successful...!",
              email: user.email,
              token,
            });
          })
          .catch((error) => {
            return res.status(500).send({ msg: "Error comparing passwords", error });
          });
      })
      .catch((error) => {
        return res.status(500).send({ error: "Error finding user" });
      });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
}


/** GET: http://localhost:5001/api/user/example123 */
export async function getUser(req, res) {
  const { email } = req.params;

  try {
    if (!email) return res.status(501).send({ error: "Invalid email" });

    User.findOne({ email }, function (err, user) {
      if (err) return res.status(500).send({ err });
      if (!user)
        return res.status(501).send({ error: "Couldn't Find the User" });

      /** remove password from user */
      // mongoose return unnecessary data with object so convert it into json
      const { password, ...rest } = Object.assign({}, user.toJSON());

      return res.status(201).send(rest);
    });
  } catch (error) {
    return res.status(404).send({ error: `Cannot Find User Data, ${error}` });
  }
}

/** GET: http://localhost:5001/api/users */
export async function getUsers(req, res) {
  try {
    User.find({}, function (err, users) {
      if (err) return res.status(500).send({ err });
      if (!users)
        return res.status(501).send({ error: "Couldn't Find the Users" });

      /** remove password from user */
      // mongoose return unnecessary data with object so convert it into json
      // const { password, ...rest } = Object.assign({}, users.toJSON());

      return res.status(201).send(users);
    });
  } catch (error) {
    return res.status(404).send({ error: `Cannot Find Users Data, ${error}` });
  }
}

/** GET: http://localhost:5001/api/officers */
export async function getOfficers(req, res) {
  const {county,role} = req.params
  try {
    User.find({county_id:county,role}, {password:0}, function (err, users) {
      if (err) return res.status(500).send({ err });
      if (!users || users.length === 0)
        return res.status(501).send({ error: "Couldn't Find the Users" });
      return res.status(201).send(users);
    });
  } catch (error) {
    return res.status(404).send({ error: `Cannot Find Users Data, ${error}` });
  }
}

/** PUT: http://localhost:5001/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    name: "",
    msisdn: "",
    email: "",
    id_number: "",
    password: "",
    role_id: "",
    user_type: "",
    kra_brs_number: ""
}
*/
export async function updateUser(req, res) {
  console.log(req);
  try {
    // const id = req.query.id;
    const { _id } = req.body;

    if (_id) {
      const body = req.body;

      // update the data
      User.updateOne({ _id: _id }, body, function (err, data) {
        if (err) throw err;

        return res.status(201).send({ msg: "Record Updated...!" });
      });
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}

/** POST: http://localhost:5001/api/generateOTP 
 * @param : {
  "msisdn" : "254711111111",

}
*/ /**
 *
 * @param {*} req
 * @param {*} res
 */
export async function generateOTP(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const { msisdn } = req.body;
  if (!msisdn){
    return res.status(400).json({error: 'Missing Critical Data'})

  }
  let now = new Date(Date.now());
  let expiry = new Date(now).setMinutes(now.getMinutes() + 10);
  const code = req.app.locals.OTP;
  try {
    const otp = new OTP({ msisdn: msisdn, code: code, expiry: expiry });
    otp.save();
    await sendSms({
      msisdn: msisdn,
      text: `Your OTP is ${code}. The code expires in 10 minutes`,
    });
    return res.status(201).send({ status: 0, message: "OTP Sent to phone number" });
  } catch (error) {
    console.log(error);
    return res.status(501).send({ status: 1, message: "Error sending otp" });
  }
}

/** GET: http://localhost:5001/api/verifyOTP ?msisdn=254711111111&code=xxxxxx*/
export async function verifyOTP(req, res) {
  const { msisdn, code } = req.query;

  try {
    const otp = await OTP.findOne({ msisdn }).sort({ createdAt: -1 });

    if (!otp) {
      return res.status(400).send({ error: "Invalid OTP" });
    }

    if (otp.verified) {
      return res.status(400).send({ error: "OTP has already been verified" });
    }

    const currentTimestamp = Date.now(); // Get the current timestamp in seconds

    if (currentTimestamp > otp.expiry) {
      return res.status(400).send({ error: "OTP Has Expired" });
    } else {
      if (otp.code == code) {
        otp.verified = true; // Mark the OTP as verified
        await otp.save();
        return res.status(201).send({ message: "OTP Verified successfully" });
      } else {
        return res
          .status(400)
          .send({ error: "Invalid OTP. Use the last OTP received" });
      }
    }
  } catch (error) {
    return res.status(400).send({ error: "Unable to verify OTP" });
  }
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:5001/api/createResetSession */
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired!" });
}

// update the password when we have valid session
/** PUT: http://localhost:5001/api/resetPassword */
export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session expired!" });

    const { email, password } = req.body;

    try {
      User.findOne({ email })
        .then((user) => {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              User.updateOne(
                { email: user.email },
                { password: hashedPassword },
                function (err, data) {
                  if (err) throw err;
                  req.app.locals.resetSession = false; // reset session
                  return res.status(201).send({ msg: "Record Updated...!" });
                }
              );
            })
            .catch((e) => {
              return res.status(500).send({
                error: "Enable to hashed password",
              });
            });
        })
        .catch((error) => {
          return res.status(404).send({ error: "email not Found" });
        });
    } catch (error) {
      return res.status(500).send({ error });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}