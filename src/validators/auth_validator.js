import zod,{email}from 'zod';
export let registerValidatorSchema=zod.object({
    email:zod.email("email is invalid"),
    password:zod.string().min (6,"password must be minimum 6 characters long"),
    username:zod.string().min(4,"username must be minimum 4 characters long")
})
export let loginValidatorSchema=zod.object({
    email:zod.email("email is invalid"),
    password:zod.string().min(1,"password is required")
})