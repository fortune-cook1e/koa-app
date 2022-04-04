import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Redirect,
  HttpCode
} from 'routing-controllers'

@JsonController()
export class UserController {
  @Get('/users')
  getAll() {
    throw new Error('gaga')
    // return {
    //   list: [{ name: 'dd' }]
    // }
  }

  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return 'This action returns user #' + id
  }

  @Post('/users')
  post(@Body() user: any) {
    return 'Saving user...'
  }

  @Put('/users/:id')
  put(@Param('id') id: number, @Body() user: any) {
    return 'Updating a user...'
  }

  @Delete('/users/:id')
  remove(@Param('id') id: number) {
    return 'Removing user...'
  }
}
