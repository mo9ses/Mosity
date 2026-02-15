import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";


const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>What You Mean To Me.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] mx-auto text-center'
      >
        Trinity, you mean so much to me and I'm so glad I met you. You are the most beautiful girl in the world and I love spending time with you. There is absolutely nothing I would change about you other than your last name. I will always love you and care for you.
      </motion.p>
    </>
  );
};

export default SectionWrapper(About, "about");