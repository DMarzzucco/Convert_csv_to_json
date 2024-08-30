import { ApiProperty } from "@nestjs/swagger";

export default  class CreateUsresDTO {
    
    @ApiProperty({
        description: "the name of user",
        example: "Andi Walls"
    })
    readonly Nombre: string;

    @ApiProperty({
        description: "The Section about work the users",
        example: "Dev"
    })
    readonly Departamento: string;

    @ApiProperty({
        description: "Age of the users",
        example: "45"
    })
    readonly Edad: string;

    @ApiProperty({
        description: "the email of user",
        example: "AndiWalls@gmail.com"
    })
    readonly Email: string;
}