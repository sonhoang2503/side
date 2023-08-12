import {
  Connection,
  FilterQuery,
  Model,
  QueryOptions,
  SaveOptions,
  //   SortOrder,
  Types,
  UpdateQuery,
} from 'mongoose';

import { Logger } from '@nestjs/common';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  protected constructor(
    private readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  async create(
    payload: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const document = new this.model({
      ...payload,
      _id: new Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return (await document.save(options)).toJSON() as unknown as TDocument;
  }

  // async updateMany(
  // 	filterQuery: FilterQuery<TDocument>,
  // 	update: UpdateQuery<TDocument>
  // ): Promise<mongodb.UpdateResult> {
  // 	return this.model.updateMany(this.getFilter(filterQuery), update);
  // }

  // async count(filterQuery: FilterQuery<TDocument>) {
  // 	return this.model.count(this.getFilter(filterQuery));
  // }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    populate?: any,
    select?: string[],
  ) {
    const document = await this.model
      .findOne(this.getFilter(filterQuery), {}, { lean: true })
      .populate(populate)
      .select(select);

    if (!document) {
      this.logger.warn(
        `Document not found with filterQuery: ${JSON.stringify(
          filterQuery,
        )} in ${this.model?.modelName}`,
      );
      return null;
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    option?: QueryOptions,
  ) {
    const document = await this.model.findOneAndUpdate(
      this.getFilter(filterQuery),
      { ...update, updatedAt: new Date() },
      {
        ...option,
        lean: true,
        new: true,
      },
    );
    if (!document) {
      this.logger.warn(
        `Document not found with filterQuery: ${JSON.stringify(
          filterQuery,
        )} in  ${this.model?.modelName}`,
      );
      return null;
    }
    return document;
  }

  async deactive(
    filterQuery: FilterQuery<TDocument>,
    option?: QueryOptions,
  ): Promise<boolean> {
    const document = await this.model.findOneAndUpdate(
      this.getFilter(filterQuery),
      { isActive: false, deletedAt: new Date() },
      {
        ...option,
        lean: true,
        new: true,
      },
    );
    if (!document) {
      this.logger.warn(
        `Document not found with filterQuery: ${JSON.stringify(
          filterQuery,
        )} in  ${this.model?.modelName}`,
      );
      return null;
    }
    return !!document;
  }

  async delete(filterQuery: FilterQuery<TDocument>, option?: QueryOptions) {
    const document = await this.model.findOneAndDelete(
      this.getFilter(filterQuery),
      {
        ...option,
      },
    );

    if (!document) {
      this.logger.warn(
        `Document not found with filterQuery: ${JSON.stringify(
          filterQuery,
        )} in  ${this.model?.modelName}`,
      );
      return null;
    }
    return !!document;
  }

  //   async findAndCount<T>(
  //     filterQuery: FilterQuery<TDocument> & PaginationRequestDto,
  //     populate?: any,
  //     select?: string[],
  //   ): Promise<PaginationResponseDto<T>> {
  //     const newFilter = this.getFilter(filterQuery);

  //     const pageIndex =
  //       newFilter?.pageIndex >= 0 ? Number(newFilter?.pageIndex ?? 0) : 0;
  //     const pageSize =
  //       newFilter?.pageSize <= 20 && newFilter?.pageSize > 0
  //         ? Number(newFilter?.pageSize ?? 0)
  //         : 5;

  //     const sortData = newFilter?.sort?.split(':');
  //     const sort = {
  //       [sortData?.[0] || '_id']: (sortData?.[1] as SortOrder) || 'desc',
  //     };

  //     // clear unused filter
  //     delete newFilter.pageIndex;
  //     delete newFilter.pageSize;
  //     delete newFilter.sort;
  //     delete newFilter.filter;

  //     const data = await this.model
  //       .find<T>(newFilter)
  //       .skip(pageIndex * pageSize)
  //       .limit(pageSize)
  //       .sort(sort)
  //       .populate(populate)
  //       .select(select);
  //     const total = await this.model.countDocuments(newFilter);
  //     return { data, total };
  //   }

  // async startTransaction(): Promise<ClientSession> {
  // 	const session = await this.connection.startSession();
  // 	await session.startTransaction();
  // 	return session;
  // }

  private getFilter(
    filterQuery: FilterQuery<TDocument>,
  ): FilterQuery<TDocument> {
    // filterQuery.isActive = false;

    if (filterQuery.id) {
      filterQuery._id = filterQuery.id;
      delete filterQuery.id;
    }

    return filterQuery;
  }
}
