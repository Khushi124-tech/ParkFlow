import { useEffect, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { CreditCard } from "lucide-react";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { paymentService } from "../services/paymentService";
import type { Payment, PaymentMethod } from "../types/payment.types";
import { formatCurrency, formatDateTime } from "../utils/formatters";
import { paymentSchema, type PaymentFormValues } from "../utils/validationSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
  });

  async function loadPayments() {
    setIsLoading(true);
    try {
      const data = await paymentService.getAll();
      setPayments(data);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPayments();
  }, []);

  async function onSubmit(values: PaymentFormValues) {
    if (!selectedBookingId) {
      toast.error("Select a booking before paying");
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await paymentService.pay(selectedBookingId, {
        paymentMethod: values.paymentMethod as PaymentMethod,
      });
      setPayments((prev) => [created, ...prev]);
      reset();
      setSelectedBookingId(null);
      setIsModalOpen(false);
      toast.success("Payment completed successfully");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Payments</h1>
          <p className="mt-1 text-sm text-slate-500">Review payment history and record payments for completed bookings.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-1.5">
          <CreditCard className="h-4 w-4" /> Record payment
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-slate-100 bg-white p-8 text-sm text-slate-500">Loading payments...</div>
      ) : payments.length === 0 ? (
        <Card>
          <EmptyState
            icon={CreditCard}
            title="No payments yet"
            description="Complete a booking and record the payment to see it here."
          />
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Booking</th>
                <th className="px-4 py-3 font-medium">Method</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">#{payment.id}</td>
                  <td className="px-4 py-3 text-slate-600">#{payment.bookingId}</td>
                  <td className="px-4 py-3 text-slate-600">{payment.paymentMethod}</td>
                  <td className="px-4 py-3 text-slate-600">{formatCurrency(payment.amount)}</td>
                  <td className="px-4 py-3 text-slate-600">{payment.status}</td>
                  <td className="px-4 py-3 text-slate-600">{formatDateTime(payment.paymentTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal title="Record payment" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Booking ID"
            type="number"
            placeholder="123"
            value={selectedBookingId ?? ""}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setSelectedBookingId(Number(event.target.value))}
          />
          <Select
            label="Payment method"
            options={[
              { label: "UPI", value: "UPI" },
              { label: "Card", value: "CARD" },
              { label: "Net Banking", value: "NET_BANKING" },
              { label: "Cash", value: "CASH" },
            ]}
            error={errors.paymentMethod?.message}
            {...register("paymentMethod")}
          />
          <div className="mt-2 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Pay now
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}