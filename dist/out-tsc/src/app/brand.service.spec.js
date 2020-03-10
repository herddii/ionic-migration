import { TestBed } from '@angular/core/testing';
import { BrandService } from './brand.service';
describe('BrandService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(BrandService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=brand.service.spec.js.map