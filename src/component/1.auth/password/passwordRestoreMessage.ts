import {PasswordRestoreData} from "../../../api/api-auth";

export const passwordRestoreMessage = (email: string) => {
  // const targetLink = `http://localhost:3000/Friday#/create-new-password/$token$` //dev
  const targetLink = `https://alexjhc.github.io/Friday#/create-new-password/$token$` //deploy

  const payload: PasswordRestoreData = {
    email,
    from: 'test-front-admin <ai73a@yandex.by>',
    message: `<div style="background-color: lime; padding: 15px">
                  Password recovery link: 
                  <a href='${targetLink}'>link</a>
              </div>
              `
  }
  return payload
}
