import { test, expect } from '@playwright/test';
import { login } from '../utils/auth';
import { clickButton,scrollModalToBottom } from '../utils/actions';

const USERNAME = '0888614919';
const PASSWORD = 'P@ssw0rd';

//test james
//test toey2
//test toey

//test james2
test('1. Register runbike.', async ({ page }) => {
  await login(page, USERNAME, PASSWORD);
  await expect(page.getByRole('heading',{name: 'ประวัติการลงทะเบียน'})).toBeVisible();

  await clickButton(page,'ลงทะเบียนเลย');
  await expect(page.getByRole('heading',{name: 'เลือกการแข่งขันที่จะลงทะเบียน'})).toBeVisible();
  await expect(page.getByText('เลือกรายการที่ต้องการลงทะเบียนนักแข่ง')).toBeVisible();
  await expect(page.getByAltText('example')).toBeVisible();
  await expect(page.getByText('27 มิ.ย. 2569 - 28 มิ.ย. 2569 (27 Jun 2026 - 28 Jun 2026)')).toBeVisible();
  await expect(page.getByText('Das Huas BKK')).toBeVisible();
  await expect(page.getByText(/ผู้สมัครแล้ว\s*\d+\s*คน/)).toBeVisible();
  await expect(page.getByText('สมัครเข้าร่วมการแข่งขันนี้')).toBeVisible();
  await expect(page.getByRole('button',{name: 'ยกเลิก'})).toBeVisible();

  await page.getByText('สมัครเข้าร่วมการแข่งขันนี้').click();
  await expect(page.locator('img[src*="/assets/hero-"]')).toBeVisible();
  await expect(page.getByRole('heading',{name: 'ข้อตกลงและเงื่อนไข (Terms and Conditions)'})).toBeVisible();
  await expect(page.locator('article')).toContainText('กรุณาอ่านและยอมรับเพื่อดำเนินการต่อ');
  await expect(page.locator('article')).toContainText('Please read and accept to proceed');
  await expect(page.getByRole('heading',{name: 'นโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA)'})).toBeVisible();
  await expect(page.getByText('ข้าพเจ้ายินยอมให้จัดเก็บและใช้ข้อมูลส่วนบุคคลตามนโยบาย')).toBeVisible();
  await expect(page.getByRole('heading',{name: 'กฎกติกาการแข่งขัน (Race Rules & Regulations)'})).toBeVisible();
  await expect(page.getByText('ข้าพเจ้าได้อ่านและยอมรับกฎกติกาการแข่งขันทุกข้อ')).toBeVisible();
  await expect(page.getByText('กรุณาอ่านเอกสารทั้ง 2 ฉบับก่อนยอมรับ')).toBeVisible();
  await expect(page.getByText('คลิกที่ลิงก์ "อ่านนโยบายความเป็นส่วนตัว" เพื่อเปิดอ่านก่อน')).toBeVisible();
  await expect(page.getByRole('button', { name: 'ดำเนินการต่อ' })).toBeDisabled();

  await clickButton(page, 'อ่านนโยบายความเป็นส่วนตัว');
  await expect(page.getByRole('dialog', { name: 'นโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA)' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'ปิด' })).toBeEnabled();
  await expect(page.locator('.ant-modal').filter({ hasText: 'นโยบายคุ้มครองข้อมูลส่วนบุคคล' }).locator('button:has(svg.lucide-download)')).toBeDisabled();
  await expect(page.getByRole('button', { name: 'รับทราบและยอมรับ' })).toBeDisabled();

  await scrollModalToBottom(page)
  await expect(page.locator('.ant-modal').filter({ hasText: 'นโยบายคุ้มครองข้อมูลส่วนบุคคล' }).locator('button:has(svg.lucide-download)')).toBeEnabled();
  await expect(page.getByRole('button', { name: 'รับทราบและยอมรับ' })).toBeEnabled();

  await clickButton(page, 'รับทราบและยอมรับ');
  await expect(page.getByRole('button', { name: 'อ่านนโยบายความเป็นส่วนตัว ' })).toBeHidden();
  await expect(page.getByRole('button', { name: 'ดำเนินการต่อ' })).toBeDisabled();
  await expect(page.getByRole('button', { name: '📄 เปิดอ่านอีกครั้ง' })).toBeVisible();

  await clickButton(page, 'อ่านกฎกติกาทั้งหมด ');
  await expect(page.locator('.ant-modal-title')).toHaveText('กฎกติกาการแข่งขัน');
  await expect(page.locator('.ant-modal-footer').getByRole('button', { name: 'ปิด' })).toBeEnabled();
  await expect(page.locator('.ant-modal').filter({ hasText: 'กฎกติกาการแข่งขัน' }).locator('button:has(svg.lucide-download)')).toBeDisabled();
  await expect(page.getByRole('button', { name: 'รับทราบและยอมรับ' })).toBeDisabled();

  await scrollModalToBottom(page)
  await expect(page.locator('.ant-modal').filter({ hasText: 'กฎกติกาการแข่งขัน' }).locator('button:has(svg.lucide-download)')).toBeEnabled();
  await expect(page.getByRole('button', { name: 'รับทราบและยอมรับ' })).toBeEnabled();

  await clickButton(page, 'รับทราบและยอมรับ');
  await expect(page.getByRole('button', { name: 'อ่านกฎกติกาทั้งหมด ' })).toBeHidden();
  await expect(page.getByRole('button', { name: 'ดำเนินการต่อ' })).toBeEnabled();
  await expect(page.locator('.ant-form').getByRole('button', { name: '📄 เปิดอ่านอีกครั้ง' }).nth(1))

  await clickButton(page, 'ดำเนินการต่อ');

  //Assertion
  await expect(page.getByRole('heading', { name: 'ข้อมูลนักแข่ง (Racer Information)' })).toBeVisible();
  await expect(page.getByLabel('ชื่อ ภาษาไทย (Thai Full Name)')).toBeVisible();
  await expect(page.getByLabel('นามสกุล ภาษาไทย (Thai Last Name)')).toBeVisible();
  await expect(page.getByLabel('ชื่อ ภาษาอังกฤษ (English Full Name)')).toBeVisible();
  await expect(page.getByLabel('นามสกุล ภาษาอังกฤษ (English Last Name)')).toBeVisible();
  await expect(page.getByLabel('ชื่อเล่น (Nickname)')).toBeVisible();
  await expect(page.getByLabel('ประเทศ (Country)')).toBeVisible();
  await expect(page.getByText('เพศ (Gender)')).toBeVisible();
  await expect(page.getByLabel('วันเดือนปีเกิด (Date of Birth)')).toBeVisible();
  await expect(page.getByLabel('เลขนักแข่ง (Racer Number)')).toBeVisible();
  await expect(page.getByText('ไซส์เสื้อ (Shirt Size)')).toBeVisible();
  await expect(page.locator('span.shirt-size-label')).toHaveCount(5);
  await expect(page.getByText(/รอบอก 27"/)).toBeVisible();
  await expect(page.getByText(/รอบอก 29"/)).toBeVisible();
  await expect(page.getByText(/รอบอก 31"/)).toBeVisible();
  await expect(page.getByText(/รอบอก 33"/)).toBeVisible();
  await expect(page.getByText(/รอบอก 35"/)).toBeVisible();
  await expect(page.getByLabel('สังกัดทีม (Team Name)')).toBeVisible();
  await expect(page.getByText('สูติบัตร หรือบัตรประชาชน (ID Card) , พาสปอร์ต (Passport)')).toBeVisible();
  await expect(page.getByText('เป็นสมาชิกรายปี (Annual Member)')).toBeVisible();
  await expect(page.getByRole('button', { name: 'เพิ่มนักแข่งอีกคน (Add Racer)' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'ย้อนกลับ' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'ดำเนินการต่อ' })).toBeVisible();

  //Input
  await page.getByLabel('ชื่อ ภาษาไทย (Thai Full Name)').fill('สมชาย');
  await page.getByLabel('นามสกุล ภาษาไทย (Thai Last Name)').fill('ใจดี');
  await page.getByLabel('ชื่อ ภาษาอังกฤษ (English Full Name)').fill('Somchai');
  await page.getByLabel('นามสกุล ภาษาอังกฤษ (English Last Name)').fill('Jaidee');
  await page.getByLabel('ชื่อเล่น (Nickname)').fill('ชาย');
  // await page.getByLabel('ประเทศ (Country)').click();
  // await page.getByRole('option', { name: 'ไทย (Thai)' }).click();
  await page.getByText('ชาย (Boy)').click();
  await page.getByPlaceholder("เลือกวันเกิด").click();
  await page.getByRole('button', { name: 'Choose a year' }).click();
  await page.pause();
  await page.getByRole('option', { name: '1' }).click();
  await page.getByRole('option', { name: 'มกราคม (January)' }).click();
  await page.getByRole('option', { name: '2000' }).click();
  await page.getByLabel('เลขนักแข่ง (Racer Number)').fill('123');
});
