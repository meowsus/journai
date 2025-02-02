"use client";

interface Props {
  modalId: string;
  className?: string;
  buttonText?: string;
  isClosable?: boolean;
  modalTitle?: string;
  children: React.ReactNode;
}

export default function ModalButton({
  modalId,
  className = "btn btn-sm btn-secondary",
  buttonText = "Show Modal",
  isClosable = true,
  modalTitle,
  children,
}: Props) {
  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          const modal = document.getElementById(modalId);
          (modal as HTMLDialogElement | null)?.showModal();
        }}
      >
        {buttonText}
      </button>

      <dialog id={modalId} className="modal">
        <div className="modal-box">
          {modalTitle && <h3 className="text-lg font-bold">{modalTitle}</h3>}

          {children}

          <div className="modal-action">
            {isClosable && (
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
