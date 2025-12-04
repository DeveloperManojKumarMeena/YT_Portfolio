import { motion, AnimatePresence } from "framer-motion"
import { FiX } from "react-icons/fi";

// Prop Destructuring का उपयोग करें
const OverlayMenu = ({ isOpen, onClose }) => { 
  
  // Backdrop variants for overall container animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, 
               transition: { 
                 duration: 0.3,
                 when: "beforeChildren" // Wait for backdrop to fade in before children start animating
               } 
            },
    exit: { opacity: 0, 
            transition: { 
              duration: 0.3,
              when: "afterChildren" // Wait for children to animate out before backdrop fades
            } 
          }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        // 1. Full Screen Overlay/Backdrop (Motion added here)
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/95" // Added dark transparent background
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* 2. Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 text-3xl text-white z-50 hover:text-red-500 transition-colors" 
            aria-label="closeMenu"
          >
            <FiX />
          </button>
          
          {/* 3. Menu Items */}
          <ul className="space-y-6 text-center">
            {[
              "Home",
              "About",
              "Skills",
              "Projects",
              "Experience",
              "Testimonials",
              "Contact",
            ].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 50 }} // Increased y value for better initial state
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }} // Added exit animation for list item
                transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }} // Adjusted delay for better feel
              >
                <a 
                  href={`#${item.toLocaleLowerCase()}`}
                  onClick={onClose} // This should close the menu after clicking a link
                  className="text-4xl text-white font-semibold hover:text-pink-400 transition-colors duration-300 block" // Added 'block' for better click area
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OverlayMenu;