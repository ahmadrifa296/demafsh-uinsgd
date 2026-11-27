<?php

namespace App\Filament\Resources\MediaPartnerResource\Pages;

use App\Filament\Resources\MediaPartnerResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListMediaPartners extends ListRecords
{
    protected static string $resource = MediaPartnerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
