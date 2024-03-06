import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";

import { OrderSide } from "../../types/order.type";

export class StringArray {
    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => String)
    stringArray: string[];
}

export class Trade {
    @ApiProperty()
    @IsNotEmpty()
    baseCurrency: string;

    @ApiProperty()
    @IsNotEmpty()
    marketCurrency: string;

    @ApiProperty()
    @IsEnum({ values: Object.values(OrderSide) })
    side: OrderSide;

    @ApiProperty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNumber()
    orderPrice: number;

    @ApiProperty()
    @IsNotEmpty()
    orderId?: string;

    @ApiProperty()
    @IsNumber()
    commissionInBaseCurrency: number;

    @ApiProperty()
    @IsNumber()
    commissionInMarketCurrency: number;
}
