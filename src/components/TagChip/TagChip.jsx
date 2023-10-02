import { Tag } from "models/Tag";

import styles from "./TagChip.module.css";

export const TagChip = ({ color, title }) => {
    return (
        <div 
            className={styles.root} 
            style={{ backgroundColor: color }}
        >
            <span>{title}</span>
        </div>
    );
};

TagChip.propTypes = Tag;