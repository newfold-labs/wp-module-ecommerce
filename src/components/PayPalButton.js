import {useEffect, useRef} from '@wordpress/element';

const PaypalButton = () => {
  const ppButton = useRef();

  useEffect(() => {
    const bbt = document.querySelector('.yith-btn-paypal');
    bbt && ppButton.current.appendChild(bbt);
    return () => {
      const hiddenWrapper = document.querySelector('.yith-ppcp-hidden-button-wrapper');
      hiddenWrapper && hiddenWrapper.appendChild(bbt);
    };
  }, []);

  return (
      <div className="pp-button-wapper" ref={ppButton}></div>
  );
};

export default PaypalButton;