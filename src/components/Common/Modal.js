import React from "react";
import { VscLoading } from "react-icons/vsc";
const Modal = (props) => {
  const okColor = props.okColor ? props.okColor : "red";
  const renderModal = () => {
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 dark:bg-gray-700 opacity-75 dark:opacity-100"></div>
          </div>

          <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white dark:bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {props.icon && (
                  <div
                    className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-${okColor}-300 sm:mx-0 sm:h-10 sm:w-10 text-xl text-white`}
                  >
                    {props.icon}
                  </div>
                )}

                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  {props.title && (
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                      id="modal-headline"
                    >
                      {props.title}
                    </h3>
                  )}

                  {props.text && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-200">
                        {props.text}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              {props.okText && (
                <button
                  type="button"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-${okColor}-600 text-base font-medium text-white hover:bg-${okColor}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${okColor}-500 sm:ml-3 sm:w-auto sm:text-sm flex items-center`}
                  onClick={props.onOk}
                >
                  {props.loading && (
                    <span className="animate-spin mr-2">
                      <VscLoading />
                    </span>
                  )}

                  {props.okText}
                </button>
              )}

              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={props.onCancel}
              >
                {props.cancelText ? props.cancelText : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (props.visible) {
    return renderModal();
  } else {
    return null;
  }
};

export default Modal;
