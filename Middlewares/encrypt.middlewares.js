import bcrypt from "bcryptjs";

const encryptdata = (userpass) => {

    const salt = bcrypt.genSaltSync(10);  // Generate a new salt each time
    return bcrypt.hashSync(userpass, salt);  // Hash the userpass with the salt
};

const comparedata = (dbPass,userpass) => {
    return bcrypt.compareSync(userpass,dbPass);
}
export {
    encryptdata, comparedata
} ;
