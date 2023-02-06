export const statusCodes = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  ise: 500, //internalServerError
  serviceUnavailable: 503,
  ue: 422, //unprocessableEntity
  userNotFound: 404,
  userNotVerified: 401,
}

export const errorMessages = {
  adminService: {
    usernameAlreadyTaken: "با ایمیل مورد نظر حساب ادمین وجود دارد",
    usernameNotFound: "با ایمیل مورد نظر حساب کاربری وجود ندارد",
    adminAlreadyExists: "ادمین اصلی از قبل وجود دارد",
    incorrectCredentials: "ایمیل یا رمز عبور اشتباه است",
    incorrectPassword: "رمز عبور اشتباه است",
  },
  userService: {
    phoneAlreadyTaken: "با شماره تلفن مورد نظر حساب کاربری وجود دارد",
    usernameAlreadyTaken: "با ایمیل مورد نظر حساب کاربری وجود دارد",
    phoneNotFound: "با شماره تلفن مورد نظر حساب کاربری وجود ندارد",
    incorrectCredentials: "ایمیل یا رمز عبور اشتباه است",
    incorrectPassword: "رمز عبور اشتباه است",
    noSuchUser: "کاربر مورد نظر وجود ندارد"
  },
  commentService: {
    noSuchComment: 'کامنت مورد نظر وجود ندارد',
    productNotFound: 'غذای مورد نظر یافت نشد'
  },
  shared: {
    ise: "سرور با مشکل مواجه شده",
    permissionsRequired: "شما دسترسی لازم برای این کار را ندارید",
    unauthorized: "هویت شما احراز نشده است",
    notFound: "محتوای مورد نظر یافت نشد",
    nameMustBeUnique: 'نام انتخاب شده از قبل وجود دارد', 
    noChanges: 'هیچ تغییری وجود ندارد'
  }
}
