import React from "react";

const Dialog = ({ setResuDialog, setDialogVisible, title, text, classIcon, textBtn1, textBtn2, submit}) => {
  return (
    <div className="container-dialog">
      <div className="dialog">
        <header className="dialog__header">
        </header>
        <main className="dialog__main">
          <i className={`bi ${classIcon}`}></i>
          <div className="">
            <h1 className="dialog__main__title">
              {title}
            </h1>
            <p className="dialog__main__text">
              {text}
            </p>
          </div>
        </main>
        <footer className="dialog__footer">
          <button onClick={submit}>{textBtn1}</button>
          <button onClick={() => {
            setResuDialog(0);
            setDialogVisible(false);
          }}>{textBtn2}</button>
        </footer>
      </div>
    </div>
  );
};

export default Dialog;
