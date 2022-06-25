import { DeepPartial, Like } from 'typeorm'
import {
  JsonController,
  Get,
  Post,
  Body,
  Ctx,
  QueryParam,
  BodyParam
} from 'routing-controllers'
import { Inject, Service } from 'typedi'
import { StaffService } from './../services/staffService'
import { StaffEntity } from '../entities'

@JsonController('/staff')
@Service()
export default class StaffController {
  @Inject() private readonly StaffService: StaffService

  @Get('/list')
  async getList(
    @QueryParam('page') page = 1,
    @QueryParam('page_size') page_size = 10,
    @QueryParam('keyword') keyword?: string
  ) {
    const _keyword = keyword || ''
    const [list, total] = await this.StaffService.repo.findAndCount({
      where: { name: Like('%' + _keyword + '%') },
      order: { name: 'DESC' },
      take: page_size,
      skip: page - 1
    })
    return {
      pager: {
        page,
        page_size: page_size || 10,
        total
      },
      list
    }
  }

  @Post('/add')
  async add(@Body() staff: DeepPartial<StaffEntity>) {
    return await this.StaffService.create(staff)
  }

  @Post('/delete')
  async delete(@BodyParam('id') id: string) {
    return await this.StaffService.del({ id })
  }

  @Post('/update')
  async updayte(@Body() staff: DeepPartial<StaffEntity>) {
    return await this.StaffService.update(staff)
  }
}
