import React, { useRef } from "react";
import Modal from "react-bootstrap/Modal";

/**
 * @props
 *  -show: Variável que define se o Modal está aberto ou não;
 *  -setShow: Função que altera a visibilidade do modal;
 *  -title: Título do modal;
 *  -size: Tamanho do modal, xl por padrão
 */
const DetailModal = (props: {
  size: string | "sm" | "lg" | "xl" | undefined;
  show: boolean | undefined;
  title: string;
  setShow: (arg0: boolean) => void;
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const ref = useRef(null);
  const siz = props.size || "xl";

  return (
    <div>
      {/* <Modal ref={ref} show={props.show} size={siz}> */}
      <Modal ref={ref} show={props.show}>
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
          {props.setShow ? (
            <button
              type="button"
              className="btn-transparent"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => props.setShow(false)}
            >
              <span className="text-color-padrao font-22">
                <i className="fa-solid fa-xmark"></i>
              </span>
            </button>
          ) : (
            <></>
          )}
        </Modal.Header>
        <Modal.Body>
          <div className="px-3">{props.children}</div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DetailModal;

// import React, { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// //import Button from "../utils/Button";

// const ModalPers = (msg: string) => {
//   const [showModal, setShowModal] = useState(false);

//   // aí você coloca por exemplo um onClick em algum botão pra dar setShowModal(true);

//   const suaFuncao = () => {
//     console.log("clicou"); // substitui pelo que você quer que aconteça quando clicar em confirmar
//   };

//   return (
//     <Modal size="lg" title={msg} show={showModal} setShow={setShowModal}>
//       <form role="form text-left" method="post" action="" onSubmit={suaFuncao}>
//         <div>Tem certeza que deseja realizar esta ação?</div>
//         <div
//           id="modalFooter"
//           className="mt-4 modal-footer justify-content-between"
//         >
//           <Button
//             type="button"
//             onClick={() => setShowModal(false)}
//             className="btn bg-gradient-success text-white me-2"
//           >
//             OK
//           </Button>
//           {/* <Button type="submit" width="30%" className="btn bg-gradient-danger text-white me-2">
//                         Confirmar
//                     </Button> */}
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default ModalPers;

// import React, { useState } from "react";
// import ModalClass from "react-bootstrap/Modal";

// function Modal(setShow: boolean) {
//   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//   setShow = setShow;

//   return (
//     <>
//       <ModalClass show={props.show}>
//         <ModalClass.Header closeButton>
//           <ModalClass.Title>Modal title</ModalClass.Title>
//         </ModalClass.Header>
//         <ModalClass.Body>
//           I will not close if you click outside me. Don not even try to press
//           escape key.
//         </ModalClass.Body>
//       </ModalClass>
//     </>
//   );
// }

// export default Modal;
