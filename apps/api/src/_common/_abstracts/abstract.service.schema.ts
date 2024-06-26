import { CountOptions } from "mongodb"
import { FilterQuery, Model, MongooseBaseQueryOptions, ProjectionType, QueryOptions, SaveOptions, Types, UpdateQuery } from "mongoose"
import { AbstractSchema } from "./abstract.schema"
import { AbstractService, AbstractServiceContext } from "./abstract.service"

export abstract class AbstractServiceSchema<T = AbstractSchema, D = object> extends AbstractService {
  protected abstract _model: Model<T>

  public constructor(context?: AbstractServiceContext) {
    super(context)
  }
  // find!: (filters?: FilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>) => Promise<T[]>

  public async find(
    filters?: FilterQuery<T> | null | undefined,
    projection?: ProjectionType<T> | null | undefined,
    options?: QueryOptions<T> | null | undefined,
  ) {
    return await this._model.find(filters, projection, options).exec()
  }

  public async count(
    filters?: FilterQuery<T> | null | undefined,
    options?: CountOptions & MongooseBaseQueryOptions<T> | null | undefined,
  ): Promise<number> {
    this.logger.debug(['count', JSON.stringify(Object.values(arguments))])
    return await this._model.countDocuments(filters, options).exec()
  }

  public async findAndCount(
    filters?: FilterQuery<T> | null | undefined,
    projection?: ProjectionType<T> | null | undefined,
    findOptions?: QueryOptions<T> | null | undefined,
    countOptions?: CountOptions & MongooseBaseQueryOptions<T> | null | undefined,
  ) {
    const count = await this.count(filters, countOptions)
    const data = await this.find(filters, projection, findOptions)
    return [data, count]
  }

  public async create(data?: Partial<D>, options?: SaveOptions) {
    const document = new this._model({
      metadata: {
        //TODO: Implement createdBy and updatedBy
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ...data,
    })

    return await document.save(options)
  }

  public async findById(
    _id: Types.ObjectId | any,
    projection?: ProjectionType<T> | null | undefined,
    options?: QueryOptions<T> | null | undefined,
  ) {
    return await this._model.findById(_id, projection, options).exec()
  }

  public async findOne(
    filters?: FilterQuery<T> | null | undefined,
    projection?: ProjectionType<T> | null | undefined,
    options?: QueryOptions<T> | null | undefined,
  ) {
    return await this._model.findOne(filters, projection, options).exec()
  }

  public async update(
    _id: Types.ObjectId | any,
    update: UpdateQuery<T>,
    options?: QueryOptions<T> | null | undefined,
  ) {
    return await this._model.findByIdAndUpdate({ _id }, {
      ...update,
      $setOnInsert: {
        ...update?.$setOnInsert,
        //TODO: Implement createdBy and updatedBy
        'metadata.createdAt': new Date(),
      },
      $set: {
        ...update?.$set,
        //TODO: Implement createdBy and updatedBy
        'metadata.lastUpdatedAt': new Date(),
      },
    }, {
      new: true,
      runValidators: true,
      ...options,
    }).exec()
  }

  public async delete(
    _id: Types.ObjectId | any,
    options?: QueryOptions<T> | null | undefined,
  ) {
    return await this._model.findByIdAndDelete({ _id }, options).exec()
  }
}
