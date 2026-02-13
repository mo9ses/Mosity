import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";


const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Introduction.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] mx-auto text-center'
      >
        Hello. My name is Bryan Athanas and I'm a skilled aspiring cloud engineer with experience in TypeScript, JavaScript, Java, and Python. My goal is to create efficient, scalable, and user-friendly solutions in the future.
      </motion.p>
    </>
  );
};

export default SectionWrapper(About, "about");