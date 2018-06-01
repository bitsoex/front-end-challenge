import { css, keyframes } from "emotion";
import { colors } from "../../themes";

const styles = {
  container: css`
    font-size: small;
    flex: 1 auto;
    padding: 0 10px;
  `,
  title: css`
    padding 10px 20px;
    display: flex;
    justify-content: space-between;
  `,
  listContainer: css`
    color: ${colors.sidebar.text};
  `,
  row: css`
    display: flex;
    justify-content: space-between;
    padding: 3px 0px;
  `,
  item: css`
    flex: 1;
    text-align: right;
  `,
  slideLeft: keyframes`
    from {
      transform: translateX(50%);
      opacity: 0;
    }
  `
};

export const animations = {
  slideLeft: css`
    animation: ${styles.slideLeft} 0.3s both;
    animation-delay: calc(var(--i) * 0.1s);
  `
};

export default styles;
