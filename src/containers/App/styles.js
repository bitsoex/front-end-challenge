import { css } from "emotion";

export default {
  container: css`
    display: flex;
    flex-flow: row wrap;
    & > * {
      flex: 1 100%;
    }

    @media all and (min-width: 600px) {
      .aside {
        flex: 1 auto;
        max-width: 250px;
        padding: 10px;
      }
    }

    @media all and (min-width: 800px) {
      .main {
        flex: 3 0px;
      }
      .aside-left {
        order: 1;
      }
      .main {
        order: 2;
      }
      .aside-right {
        order: 3;
      }
    }
  `,
  orderBookContainer: css`
    display: flex;
    justify-content: space-around;
  `
};
