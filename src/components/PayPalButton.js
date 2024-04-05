import {useEffect, useRef} from '@wordpress/element';

const PaypalButton = () => {
  const ppButton = useRef();

  useEffect(() => {
    const paypalBtn = document.querySelector('.yith-btn-paypal');
    paypalBtn && ppButton.current.appendChild(paypalBtn);
    return () => {
      const hiddenWrapper = document.querySelector('.yith-ppcp-hidden-button-wrapper');
      hiddenWrapper && hiddenWrapper.appendChild(paypalBtn);
    };
  }, []);

  return (
      <div className="pp-button-wapper" ref={ppButton}></div>
  );
};

export default PaypalButton;