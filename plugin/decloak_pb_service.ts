// package: decloak
// file: decloak.proto

import * as decloak_pb from "./decloak_pb";
export class FetchProxy {
  static serviceName = "decloak.FetchProxy";
}
export namespace FetchProxy {
  export class fetchPage {
    static readonly methodName = "fetchPage";
    static readonly service = FetchProxy;
    static readonly requestStream = false;
    static readonly responseStream = true;
    static readonly requestType = decloak_pb.FetchURL;
    static readonly responseType = decloak_pb.WebPage;
  }
}
export class CloakDetector {
  static serviceName = "decloak.CloakDetector";
}
export namespace CloakDetector {
  export class isCloaked {
    static readonly methodName = "isCloaked";
    static readonly service = CloakDetector;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = decloak_pb.ListWebPage;
    static readonly responseType = decloak_pb.MlResponse;
  }
}
