export const wcTasksParser = (title) => (data) => {
  console.log('wcTasksParser', data);
  const isCompleted = (data?.[0]?.tasks ?? []).find(
    (task) => task.id === title
  )?.isComplete;
  return { isCompleted };
};

export const yithOnboardingParser = (title) => (data) => {
  console.log('yithOnboardingParser', data);
  return { isCompleted: data?.[title] };
};
