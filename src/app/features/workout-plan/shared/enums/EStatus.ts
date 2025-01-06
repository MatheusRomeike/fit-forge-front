export enum EStatus {
  Draft = 1,
  Published = 2,
  Archived = 3,
}

export const StatusLabels = {
  [EStatus.Draft]: 'tags.status.draft',
  [EStatus.Published]: 'tags.status.published',
  [EStatus.Archived]: 'tags.status.archived',
};
