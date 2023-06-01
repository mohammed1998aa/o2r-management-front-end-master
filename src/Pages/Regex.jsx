export const validEmail = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z.-]$"
);
export const validEditEmail = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z.-]$"
);
export const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");

export const validUserName = new RegExp(
  "^(?=.*?^[a-zA-Z0-9_/s+/g]*$)(?=.*?).{3,15}$"
);

export const validUrlName = new RegExp("^(?=.*?^[a-zA-Z0-9]*$).{3,15}$");

export const validUrl = new RegExp(
  "(www.)?" +
    "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" +
    "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
);
//for name:-  "^(?=.*?^[a-zA-Z0-9_/s+/g]*$)(?=.*?).{3,15}$" you can add name without numbers
export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const passwordRegex =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$";
