import { Order } from '../types';

export const submitOrder = async (order: Order): Promise<{ success: boolean; message: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log("--------------- ORDER RECEIVED ---------------");
  console.log("Customer:", order.fullName);
  console.log("City:", order.city);
  console.log("Phone:", order.phoneNumber);
  console.log("Total:", order.total);
  console.log("Items:", order.items);
  console.log("----------------------------------------------");

  /**
   * INTEGRATION TIP:
   * To connect this to Google Sheets:
   * 1. Create a Google Sheet.
   * 2. Extensions > Apps Script.
   * 3. Create a doPost(e) function to parse JSON and appendRow.
   * 4. Deploy as Web App (Anyone can access).
   * 5. Use fetch() here to post data to that URL.
   * 
   * Example:
   * await fetch('YOUR_GOOGLE_SCRIPT_URL', {
   *   method: 'POST',
   *   body: JSON.stringify(order)
   * });
   */

  return { success: true, message: "تم استلام طلبك بنجاح! سنتصل بك قريباً للتأكيد." };
};