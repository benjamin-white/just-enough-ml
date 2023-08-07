import { test, expect } from '@playwright/test'

test('renders root page', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await expect(page).toHaveTitle('Just Enough ML™')
  await expect(page.getByText('Just Enough ML')).toBeInViewport()
})
