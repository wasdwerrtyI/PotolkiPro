import { observer } from "mobx-react-lite";
import { catalogStore } from "../../stores/catalogStore";
import { SECTION_LABELS } from "../../types";
import type { FilterSection } from "../../types";
import styles from "./CategoryFilter.module.scss";

const SECTIONS: FilterSection[] = [
  "all",
  "material",
  "texture",
  "construction",
  "design",
  "mounting",
];

const CategoryFilter = observer(() => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.filterGroup}>
        <div className={styles.tabs}>
          {SECTIONS.map((sec) => (
            <button
              key={sec}
              className={`${styles.tab} ${catalogStore.activeSection === sec ? styles.active : ""}`}
              onClick={() => catalogStore.setSection(sec)}
            >
              {SECTION_LABELS[sec]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

export default CategoryFilter;
