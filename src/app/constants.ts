export const CONSUMER_USER_TYPE = 'consumer';
export const EMPLOYEES_USER_TYPE = 'employees';
export const OWNER_USER_TYPE = 'owner';

export const NEW_ORDER_STATUS = 'new';
export const IN_PROGRESS_ORDER_STATUS = 'in_progress';
export const DELIVERY_ORDER_STATUS = 'delivering';
export const PICKUP_ORDER_STATUS = 'pickup';
export const FINISHED_ORDER_STATUS = 'finished';

export const STATUS_DISPLAY: { [key: string]: string } = {
  [NEW_ORDER_STATUS]: 'In Queue',
  [IN_PROGRESS_ORDER_STATUS]: 'In Progress',
  [DELIVERY_ORDER_STATUS]: 'Delivering',
  [PICKUP_ORDER_STATUS]: 'Ready for Pickup',
  [FINISHED_ORDER_STATUS]: 'Order Complete'
};

export const STATUS_MESSAGE: { [key: string]: string } = {
  [NEW_ORDER_STATUS]: 'Your order is in the queue.',
  [IN_PROGRESS_ORDER_STATUS]: 'Your order is being made by ',
  [DELIVERY_ORDER_STATUS]: 'Your order is being delivered.',
  [PICKUP_ORDER_STATUS]: 'Your order is ready for pickup.',
  [FINISHED_ORDER_STATUS]: 'Your order is complete!'
};

export const BAR_OPEN = 'OPEN';
export const BAR_CLOSED = 'CLOSED';

export const WRONG_USER_TYPE_ERROR = 'wrong_user_type';
export const NO_AUTH_ERROR = 'no_auth';
