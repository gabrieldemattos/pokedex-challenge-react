//hooks
import { useState, useEffect } from "react";

//icon
import { BsFillArrowUpCircleFill } from "react-icons/bs";

//css
import styles from "./BackToTop.module.css";

type Props = {
  scroll: number;
};

const BackToTop = ({ scroll }: Props) => {
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop: number = window.pageYOffset;
      if (scrollTop >= scroll) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return (): void => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  const handleClick = (): void => {
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
