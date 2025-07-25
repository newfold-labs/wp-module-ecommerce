import {useEffect, useRef} from '@wordpress/element';

const PayPalButton = () => {
  const ppButton = useRef();

  useEffect(() => {
    const paypalBtn = document.querySelector('.yith-btn-paypal');
    paypalBtn.setAttribute("id", "connect-to-paypal-btn");    
    paypalBtn && ppButton.current.appendChild(paypalBtn);
    return () => {
      const hiddenWrapper = document.querySelector('.yith-ppcp-hidden-button-wrapper');
      hiddenWrapper && hiddenWrapper.appendChild(paypalBtn);
    };
  }, []);

  return (
      <div className="pp-button-wapper" id="connect-to-paypal" ref={ppButton}></div>
  );
};

export default PayPalButton;