<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DonationResource\Pages;
use App\Models\Donation;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class DonationResource extends Resource
{
    protected static ?string $model = Donation::class;

    protected static ?string $navigationIcon = 'heroicon-o-heart';

    protected static ?string $navigationGroup = 'Layanan Mahasiswa';

    protected static ?string $navigationLabel = 'DEMA FSH Peduli';

    protected static ?string $modelLabel = 'Program Donasi';

    protected static ?string $pluralModelLabel = 'DEMA FSH Peduli';

    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Program Donasi')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Judul Kampanye')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('description')
                            ->label('Deskripsi Program')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('target_amount')
                            ->label('Target Dana')
                            ->numeric()
                            ->prefix('Rp')
                            ->default(0)
                            ->required(),
                        Forms\Components\TextInput::make('collected_amount')
                            ->label('Dana Terkumpul')
                            ->numeric()
                            ->prefix('Rp')
                            ->default(0)
                            ->required(),
                        Forms\Components\Textarea::make('bank_info')
                            ->label('Informasi Rekening Bank')
                            ->rows(3)
                            ->columnSpanFull(),
                        Forms\Components\FileUpload::make('qris_image')
                            ->label('Gambar QRIS')
                            ->image()
                            ->imageEditor()
                            ->disk('public')
                            ->directory('donations')
                            ->visibility('public')
                            ->columnSpanFull(),
                        Forms\Components\Toggle::make('is_active')
                            ->label('Kampanye Aktif')
                            ->default(true),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\ImageColumn::make('qris_image')
                    ->label('QRIS')
                    ->disk('public'),
                Tables\Columns\TextColumn::make('title')
                    ->label('Judul Kampanye')
                    ->searchable()
                    ->wrap(),
                Tables\Columns\TextColumn::make('target_amount')
                    ->label('Target')
                    ->money('IDR', locale: 'id')
                    ->sortable(),
                Tables\Columns\TextColumn::make('collected_amount')
                    ->label('Terkumpul')
                    ->money('IDR', locale: 'id')
                    ->sortable(),
                Tables\Columns\ToggleColumn::make('is_active')
                    ->label('Aktif'),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Diperbarui')
                    ->dateTime('d M Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Status Kampanye')
                    ->trueLabel('Aktif')
                    ->falseLabel('Nonaktif'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDonations::route('/'),
            'create' => Pages\CreateDonation::route('/create'),
            'edit' => Pages\EditDonation::route('/{record}/edit'),
        ];
    }
}
