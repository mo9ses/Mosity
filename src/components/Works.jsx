import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { collections } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";



const ProjectCard = ({
  index,
  description,
  image
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{max: 45, scale: 1, speed: 450}}
        className='bg-tertiary p-4 sm:p-5 rounded-2xl sm:w-[360px] w-full h-[380px] sm:h-[480px] md:h-[580px] flex flex-col'
      >
        <div className='relative w-full h-[250px] sm:h-[300px] md:h-[430px] flex-shrink-0'>
          <img
            src={`/assets/pictures/${image}.jpg`}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

        </div>

        <div className='mt-3 sm:mt-5 flex-1 flex items-start'>
          <p className='mt-2 text-secondary text-center text-[16px] sm:text-[14px] leading-relaxed'>{description}</p>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="mb-6">
        <h2 className={`${styles.sectionHeadText} text-white`}>A Collection Of Us</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-4 text-secondary text-[16px] sm:text-[17px] max-w-3xl leading-[28px] sm:leading-[30px] mx-auto text-center px-4'
        >
          This is a collection some of my favorite moments with you.
          Not because they’re perfect, but because they’re ours.
          Every picture here is a memory I wouldn’t trade for anything.
        </motion.p>
      </div>

      <div className='mt-12 sm:mt-20 flex flex-wrap gap-5 sm:gap-7 justify-center'>
        {collections.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
