
export interface IYoutube {
  eTag: string | undefined;
  eventId?: null;
  items?: (ItemsEntity)[] | null;
  kind: string | undefined;
  nextPageToken: string | undefined;
  pageInfo: PageInfo | undefined;
  prevPageToken?: null;
  tokenPagination?: null;
  visitorId?: null;
}

export class Youtube {
  eTag: string | undefined;
  eventId?: null;
  items?:Array<ItemsEntity> | null;
  kind: string | undefined;
  nextPageToken: string | undefined;
  pageInfo: PageInfo | undefined;
  prevPageToken?: null;
  tokenPagination?: null;
  visitorId?: null;

  // static Deserialize(jsonArray: any[]) {
  //   jsonArray.map((json) => {
  //     const youtube = new Youtube();
  //     youtube.eTag = json.eventId;
  //     youtube.eventId = json.eventId;
  //     youtube.items = json.items;
  //     youtube.nextPageToken = json.nextPageToken;
  //     youtube.pageInfo = json.pageInfo;
  //     youtube.prevPageToken = json.prevPageToken;
  //     youtube.tokenPagination = json.tokenPagination;
  //     youtube.visitorId = json.visitorId;
  //     return youtube;
  //   })
  // }

  static fromJS(data: any): Youtube {
    data = typeof data === 'object' ? data : {};
    let result = new Youtube();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.eTag = data.eventId;
      this.eventId = data.eventId;
      this.items = data.items;
      this.nextPageToken = data.nextPageToken;
      this.pageInfo = data.pageInfo;
      this.prevPageToken = data.prevPageToken;
      this.tokenPagination = data.tokenPagination;
      this.visitorId = data.visitorId;

    }
  }


}
export class ItemsEntity {
  ageGating?: null;
  contentDetails?: null;
  eTag: string | undefined;
  fileDetails?: null;
  id: string | undefined;
  kind: string | undefined;
  liveStreamingDetails?: null;
  localizations?: null;
  monetizationDetails?: null;
  player?: null;
  processingDetails?: null;
  projectDetails?: null;
  recordingDetails?: null;
  snippet: Snippet | undefined;
  statistics?: null;
  status?: null;
  suggestions?: null;
  topicDetails?: null;
}
export class Snippet {
  categoryId: string | undefined;
  channelId: string | undefined;
  channelTitle: string | undefined;
  defaultAudioLanguage?: string | null;
  defaultLanguage?: string | null;
  description: string | undefined;
  liveBroadcastContent: string | undefined;
  localized: Localized | undefined;
  publishedAt: string | undefined;
  tags?: (string)[] | null;
  thumbnails: Thumbnails | undefined;
  title: string | undefined;
  eTag?: null;
}
export class Localized {
  description: string | undefined;
  title: string | undefined;
  eTag?: null;
}
export class Thumbnails {
  default__: DefaultOrHighOrMaxresOrMediumOrStandard | undefined;
  high: DefaultOrHighOrMaxresOrMediumOrStandard | undefined;
  maxres?: DefaultOrHighOrMaxresOrMediumOrStandard1 | null;
  medium: DefaultOrHighOrMaxresOrMediumOrStandard | undefined;
  standard?: DefaultOrHighOrMaxresOrMediumOrStandard2 | null;
  eTag?: null;
}
export class DefaultOrHighOrMaxresOrMediumOrStandard {
  height: number | undefined;
  url: string | undefined;
  width: number | undefined;
  eTag?: null;
}
export class DefaultOrHighOrMaxresOrMediumOrStandard1 {
  height: number | undefined;
  url: string | undefined;
  width: number | undefined;
  eTag?: null;
}
export class DefaultOrHighOrMaxresOrMediumOrStandard2 {
  height: number | undefined;
  url: string | undefined;
  width: number | undefined;
  eTag?: null;
}
export class PageInfo {
  resultsPerPage: number | undefined;
  totalResults: number | undefined;
  eTag?: null;
}
