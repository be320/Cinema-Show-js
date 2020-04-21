import React, {useRef,useEffect} from "react";

const Error = ({handleError, errorMessages}) => {
    const errorNode = useRef();

    const closeAction = e => {
        if (!errorNode.current.contains(e.target)) {
            handleError(false);
        }
      };

      const cancel = () => {
        handleError(false);
      }

      useEffect(() => {

        document.addEventListener("mousedown", closeAction);
    
        return () => {
          document.removeEventListener("mousedown", closeAction);
        };
      }, []);


  return (
    <div id="error-container">
      <div className="error" ref={errorNode}>
        <div className="error-header">Error(s) occured !!</div>
        <hr />

        <div className="error-body">
          <ul >
              {
                  errorMessages.map((e)=>(
                    <li>{e.msg}</li>
                  ))
              }
          </ul>
        </div>

        <div className="error-footer">
          <div id="cancel-review" onClick={cancel} >
            <p>Exit </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
