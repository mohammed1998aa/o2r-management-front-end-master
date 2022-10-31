export const validEmail = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
);
export const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");

export const validUserName = new RegExp(
  "^(?=.*?^[a-zA-Z0-9_/s+/g]*$)(?=.*?[0-9_ ]).{3,15}$"
);
//for name:-  "^(?=.*?^[a-zA-Z0-9_/s+/g]*$)(?=.*?).{3,15}$" you can add name without numbers

export const rrr=()=>{
  return(<div>ssss hi</div>)
}