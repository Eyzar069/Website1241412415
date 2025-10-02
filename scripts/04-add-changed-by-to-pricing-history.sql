-- Add changed_by column to pricing_history table to track who made the price change

ALTER TABLE pricing_history
ADD COLUMN IF NOT EXISTS changed_by TEXT;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_pricing_history_changed_by ON pricing_history(changed_by);
