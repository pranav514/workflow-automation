import bcrypt from "bcryptjs";

export  function hashPassword(password: string) : string {
    const hashed = bcrypt.hashSync(password)
    return hashed
}

export function comparePassword({password , hashedPassword}: {password: string, hashedPassword: string}) : boolean {
    if(bcrypt.compareSync(password , hashedPassword)) {
        return true;
    }
    return false;
}