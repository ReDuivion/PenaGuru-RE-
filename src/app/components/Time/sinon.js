import { render, screen, fireEvent } from '@testing-library/react';
import Presensi from '../../me/absen/page.jsx';
import sinon from 'sinon';
import * as dateFns from 'date-fns';

describe('Presensi', () => {
  let clock;

  beforeEach(() => {
    // Membuat jam palsu menggunakan Sinon
    clock = sinon.useFakeTimers(new Date('2024-02-01').getTime()); // Misalnya, tanggal 1 Februari 2024
  });

  afterEach(() => {
    // Mengembalikan jam ke kondisi semula setelah setiap tes
    clock.restore();
  });

  it('should handle check-in correctly', async () => {
    const formatStub = sinon.stub(dateFns, 'format').returns('2024-02-01');
    const insertStub = sinon.stub(Presensi.prototype, 'handleCheckIn');

    render(<Presensi />);
    const button = screen.getByText('Check-In');
    fireEvent.click(button);

    // Tunggu hingga semua operasi asinkron selesai
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(insertStub.calledOnce).toBe(true);
    expect(formatStub.calledOnce).toBe(true);

    // Mengembalikan stub ke kondisi semula
    formatStub.restore();
    insertStub.restore();
  });

  it('should handle check-out correctly', async () => {
    const formatStub = sinon.stub(dateFns, 'format').returns('2024-02-01');
    const updateStub = sinon.stub(Presensi.prototype, 'handleCheckOut');

    render(<Presensi />);
    const button = screen.getByText('Check-Out');
    fireEvent.click(button);

    // Tunggu hingga semua operasi asinkron selesai
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(updateStub.calledOnce).toBe(true);
    expect(formatStub.calledOnce).toBe(true);

    // Mengembalikan stub ke kondisi semula
    formatStub.restore();
    updateStub.restore();
  });
});
