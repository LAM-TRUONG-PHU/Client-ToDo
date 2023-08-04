import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePopupStore } from "../store/PopupStore";
export default function Popup({ message }: { message: string }) {
  const { setIsPopupOpen } = usePopupStore();
  return (
    <>
      <div
        className="justify-center mt-24 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        id="popup"
      >
        <div className="relative w-1/4   mx-auto">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#1c1c29] outline-none focus:outline-none">
            {/*header*/}

            <div className="relative flex items-start h-6 bg-red-300 bg-opacity-90 rounded-t-lg ">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="aspect-square absolute left-3 top-1 "
              />
            </div>
            {/*body*/}
            <div className="relative m-3 px-3 flex-auto text-xl text-white font-semibold">
              {message}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end m-2  border-slate-200 rounded-b">
              <button
                className="bg-red-300 text-white active:bg-red-400 font-bold uppercase text-sm px-10 py-3 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setIsPopupOpen("");
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
