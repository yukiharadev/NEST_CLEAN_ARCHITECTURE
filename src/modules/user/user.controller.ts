// user.controller.ts
import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { CqrsBus } from "@core/cqrs";
import { CreateUserCommand } from "./application/usecases/commands/create/CreateUserCommand";
import { GetAllUsersQuery } from "./application/usecases/queries/get-all/GetAllUsersQuery";
import { GetPagedUsersQuery } from "./application/usecases/queries/get-page/GetPagedUsersQuery";
import { CreateUserRequestDto } from "./application/dtos/request/CreateUserRequestDto";
import { UserResponseDto } from "./application/dtos/response/UserResponseDto";
import { PaginatedResult } from "@core/database/repositories/IRepositoryService";

@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class UserController {
    constructor(
        private readonly cqrsBus: CqrsBus
    ) {}

    @Post()
    @ApiBody({ type: CreateUserRequestDto })
    @ApiOkResponse({ description: 'User created', type: Boolean })
    async create(@Body() dto: CreateUserRequestDto): Promise<boolean> {
        const command = new CreateUserCommand(
            dto.name,
            dto.email,
        );
        return this.cqrsBus.execute(command);
    }

    @Get()
    @ApiOkResponse({ description: 'List users', type: [UserResponseDto] })
    async getAll(): Promise<UserResponseDto[]> {
        const query = new GetAllUsersQuery();
        return this.cqrsBus.query(query);
    }

    @Get('page')
    @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page index (1-based)' })
    @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Page size' })
    @ApiOkResponse({ description: 'Paged users', type: UserResponseDto, isArray: true })
    async getPage(
        @Query('page') page = '1',
        @Query('limit') limit = '10',
    ): Promise<PaginatedResult<UserResponseDto>> {
        const pageIndex = Math.max(parseInt(page, 10) || 1, 1);
        const pageSize = Math.max(parseInt(limit, 10) || 10, 1);
        const query = new GetPagedUsersQuery(pageIndex, pageSize);
        return this.cqrsBus.query(query);
    }
}