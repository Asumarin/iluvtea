import { Injectable } from '@nestjs/common';
import { TeasService } from 'src/teas/teas.service';

@Injectable()
export class TeaRatingService {
  constructor(private readonly teasService: TeasService) {}
}
