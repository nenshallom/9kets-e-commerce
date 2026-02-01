import { Product } from "@/lib/data";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
  items?: any[]; 
  showItems?: boolean;
}

export default function OrderSummary({ subtotal, shipping, vat, total, items, showItems = false }: OrderSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
      <h2 className="font-bold text-lg mb-6">Order Summary</h2>

        {/* Itemized List */}
      {showItems && items && (
        <>
          <div className="space-y-4 mb-6 max-h-75 overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.id + item.selectedColor} className="flex gap-4 text-sm">
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.quantity} x {formatCurrency(item.price)}</p>
                </div>
                <div className="font-bold text-gray-900">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
          <hr className="border-gray-100 mb-6" />
        </>
      )}

      {/* Financials */}
      <div className="space-y-3 text-sm mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-bold">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping Fee:</span>
          <span className="font-bold">{formatCurrency(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Vat:</span>
          <span className="font-bold">{formatCurrency(vat)}</span>
        </div>
        
        <div className="border-t border-gray-100 pt-4 flex justify-between text-base">
          <span className="font-bold">Total:</span>
          <span className="font-bold text-xl">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}