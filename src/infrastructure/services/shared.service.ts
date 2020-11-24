import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
    constructor(protected httpService: HttpService) {}

  async requestService(req, method, url, data = null, headers = null) {
    return await this.httpService.request( { method, url, data,
        headers: headers ? headers : {'Content-Type': 'application/json', Authorization: req.headers.authorization} })
      .toPromise()
      .catch((e: any) => { throw e; });
  }

  async validUniqueColumn(repository: any, form) {
    for (const uniqueMetadata of repository.metadata.uniques) {
      const nameProp = uniqueMetadata.givenColumnNames[0];
      if (await repository.findOne( { [`${nameProp}`]: form[`${nameProp}`] } )) {
        throw new Error(`There is already a record with the registered ${nameProp}`);
      }
    }
  }

}