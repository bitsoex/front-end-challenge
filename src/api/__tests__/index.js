import { availableBooks, ticker } from "../";

/**
 * I made these no to test the endpoints but to ensure I was getting the right info
 * and to see an example of each response.
 */

describe("verify correct usage of bitso api", () => {
  test("available books", async () => {
    const response = await availableBooks();
    // console.log(response);

    expect(response.success).toBe(true);
  });

  test("ticker", async () => {
    const response = await ticker("btc_mxn");
    console.log(response);

    expect(response.success).toBe(true);
  });
});
