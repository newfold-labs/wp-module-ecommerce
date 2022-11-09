export const wcTasksParser = (title) => (data) => {
  const isCompleted = (data?.[0]?.tasks ?? []).find(
    (task) => task.id === title
  )?.isComplete;
  return { isCompleted };
};

export const yithOnboardingParser = (title) => (data) => {
  return { isCompleted: data?.[title] == "true" };
};

export const wcPluginStatusParser = (slug, title) => (data) => {
  console.log(slug, title)
  const isInstalled = data.status?.[title] === "Active";
  const isInstalling = data?.status?.["queue-status"].some(
    (queue) => queue.slug === slug
  );
  const isQueueEmpty = data.status?.["queue-status"].length === 0;
  console.log({ isInstalled, isInstalling, isQueueEmpty })
  return { isInstalled, isInstalling, isQueueEmpty };
};
