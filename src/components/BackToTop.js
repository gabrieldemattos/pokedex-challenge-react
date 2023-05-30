//hooks
import { useState, useEffect } from "react";

//icon
import { BsFillArrowUpCircleFill } from "react-icons/bs";

//css
import styles from "./BackToTop.module.css";

const BackToTop = ({ scroll }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop >= scroll) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {showButton && (
        <button onClick={handleClick} className={styles.button}>
          <BsFillArrowUpCircleFill />
        </button>
      )}
    </div>
  );
};

export default BackToTop;
